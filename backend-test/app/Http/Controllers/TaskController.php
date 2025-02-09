<?php

namespace App\Http\Controllers;

use App\Enums\TaskType;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

use Illuminate\Validation\Rule;

use App\Models\Quest;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $tasks = Task::all();

        $data = [
            'status' => 200,
            'tasks' => $tasks
        ];

        return response()->json($data, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'quest_id' => ['required', 'integer', 'min:1', 'exists:App\Models\Quest,id'],
            'type' => ['required', Rule::enum(TaskType::class)],
            'name' => ['required', 'string', 'max:255'],
            'question' => ['required', 'string', 'max:65535'],
            'answer' => ['required', 'string', 'max:255'],
            'time_limit' => ['required', 'integer', 'min:1', 'max:65535'],
        ]);

        if ($validator->fails()) {
            $data = [
                'status' => 422,
                'message' => $validator->messages()
            ];

            return response()->json($data, 422);
        }
        else {

            $lastTaskNumber = Task::where('quest_id', $request->quest_id)
                ->max('task_number');

            $newTaskNumber = $lastTaskNumber ? $lastTaskNumber + 1 : 1;

            $task = new Task();
            $task->quest_id = $request->quest_id;
            $task->task_number = $newTaskNumber;
            $task->type = $request->type;
            $task->name = $request->name;
            $task->question = $request->question;
            $task->answer = $request->answer;
            $task->time_limit = $request->time_limit;

            $task->save();

            $data = [
                'status' => 200,
                'message' => 'Task created successfully'
            ];

            return response()->json($data, 200);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task): JsonResponse
    {
        $data = [
            'status' => 200,
            'task' => $task
        ];

//        dd((new \App\Models\Task)->lastTaskNumber(1));

        return response()->json($data, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'quest_id' => ['required', 'integer', 'min:1', 'exists:App\Models\Quest,id'],
            'task_number' => ['required', 'integer', 'min:1', 'max:65535'],
            'type' => ['required', Rule::enum(TaskType::class)],
            'name' => ['required', 'string', 'max:255'],
            'question' => ['required', 'string', 'max:65535'],
            'answer' => ['required', 'string', 'max:255'],
            'time_limit' => ['required', 'integer', 'min:1', 'max:65535'],
        ]);

        if ($validator->fails()) {
            $data = [
                'status' => 422,
                'message' => $validator->messages()
            ];

            return response()->json($data, 422);
        }
        else {
//            $task = new Task();
            $task->quest_id = $request->quest_id;
            $task->task_number = $request->task_number;
            $task->type = $request->type;
            $task->name = $request->name;
            $task->question = $request->question;
            $task->answer = $request->answer;
            $task->time_limit = $request->time_limit;

            $task->save();

            $data = [
                'status' => 200,
                'message' => 'Task updated successfully'
            ];

            return response()->json($data, 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
