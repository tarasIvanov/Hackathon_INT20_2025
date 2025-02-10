<?php

namespace App\Http\Controllers;

use App\Models\AnswerOption;
use App\Http\Requests\StoreAnswerOptionRequest;
use App\Http\Requests\UpdateAnswerOptionRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AnswerOptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $answerOptions = AnswerOption::all();

        $data = [
            'status' => 200,
            'answer_options' => $answerOptions
        ];

        return response()->json($data, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'task_id' => ['required', 'integer', 'min:1', 'exists:App\Models\Task,id'],
            'name' => ['required', 'string', 'max:255'],
            'is_correct' => ['required', 'boolean'],
        ]);

        if ($validator->fails()) {
            $data = [
                'status' => 422,
                'message' => $validator->messages()
            ];

            return response()->json($data, 422);
        }
        else {

            $answerOption = new AnswerOption();
            $answerOption->task_id = $request->task_id;
            $answerOption->name = $request->name;
            $answerOption->is_correct = $request->is_correct;

            $answerOption->save();

            $data = [
                'status' => 200,
                'message' => 'Answer option created successfully'
            ];

            return response()->json($data, 200);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(AnswerOption $answerOption): JsonResponse
    {
        $data = [
            'status' => 200,
            'answer_option' => $answerOption
        ];

        return response()->json($data, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AnswerOption $answerOption)
    {
        $validator = Validator::make($request->all(), [
//            'task_id' => ['required', 'integer', 'min:1', 'exists:App\Models\Task,id'],
            'name' => ['required', 'string', 'max:255'],
            'is_correct' => ['required', 'boolean'],
        ]);

        if ($validator->fails()) {
            $data = [
                'status' => 422,
                'message' => $validator->messages()
            ];

            return response()->json($data, 422);
        }
        else {

//            $answerOption->task_id = $request->task_id;
            $answerOption->name = $request->name;
            $answerOption->is_correct = $request->is_correct;

            $answerOption->save();

            $data = [
                'status' => 200,
                'message' => 'Answer option updated successfully'
            ];

            return response()->json($data, 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AnswerOption $answerOption)
    {
        $option_id = $answerOption->task_id;
        $answerOption->delete();

        // Reorder remaining tasks for this quest
        AnswerOption::where('task_id', $option_id)
            ->orderBy('option_number')
            ->get()
            ->each(function ($t, $index) {
                $t->update(['option_number' => $index + 1]);
            });

        $data = [
            'status' => 200,
            'message' => 'Answer option deleted successfully'
        ];

        return response()->json($data, 200);
    }
}
