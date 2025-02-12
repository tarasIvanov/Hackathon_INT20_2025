<?php

namespace App\Http\Controllers;

use App\Enums\QuestStatus;
use App\Models\AnswerOption;
use App\Models\QuestProgress;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class QuestProgressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $quest_progress = QuestProgress::all();
        $data = [
            'status' => 200,
            'quest_progress' => $quest_progress
        ];

        return response()->json($data, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => ['required', 'integer', 'min:1', 'exists:App\Models\User,id'],
            'quest_id' => ['required', 'integer', 'min:1', 'exists:App\Models\Quest,id']
        ]);

        if ($validator->fails()) {
            $data = [
                'status' => 422,
                'message' => $validator->messages()
            ];

            return response()->json($data, 422);
        }
        else {

            $questProgress = new QuestProgress();
            $questProgress->user_id = $request->user_id;
            $questProgress->quest_id = $request->quest_id;
            $questProgress->current_task = 1;
            $questProgress->status = 'in_progress';

            $questProgress->save();

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
    public function show(QuestProgress $questProgress)
    {
        $data = [
            'status' => 200,
            'quest_progress' => $questProgress
        ];

        return response()->json($data, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, QuestProgress $questProgress)
    {
        $validator = Validator::make($request->all(), [
            'current_task' => ['required', 'integer', 'min:1'],
            'status' => [Rule::enum(QuestStatus::class)
                ->only([QuestStatus::COMPLETED, QuestStatus::FAILED])
            ],
        ]);

        if ($validator->fails()) {
            $data = [
                'status' => 422,
                'message' => $validator->messages()
            ];

            return response()->json($data, 422);
        }
        else {

            $questProgress->current_task = $request->current_task;

            if ($request->has('status')) {
                $questProgress->status = $request->status;
            }

            $questProgress->save();

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
    public function destroy(QuestProgress $questProgress)
    {
        //
    }
}
