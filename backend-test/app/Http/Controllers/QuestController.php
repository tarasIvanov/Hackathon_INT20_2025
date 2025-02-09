<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Http\JsonResponse;

use App\Models\Quest;

use Illuminate\Support\Facades\Validator;



class QuestController extends Controller
{
    public function index(): JsonResponse
    {
        $quests = Quest::all();

        $data = [
            'status' => 200,
            'quests' => $quests
        ];

        return response()->json($data, 200);
    }

    public function store(Request $request): JsonResponse {

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:65535'],
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
            $quest = new Quest();
            $quest->name = $request->name;
            $quest->description = $request->description;
            $quest->time_limit = $request->time_limit;

            $quest->save();

            $data = [
                'status' => 200,
                'message' => 'Quest created successfully'
            ];

            return response()->json($data, 200);
        }
    }

    public function update(Request $request, Quest $quest): JsonResponse {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:65535'],
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
//            $quest = new Quest();
            $quest->name = $request->name;
            $quest->description = $request->description;
            $quest->time_limit = $request->time_limit;

            $quest->save();

            $data = [
                'status' => 200,
                'message' => 'Quest updated successfully'
            ];

            return response()->json($data, 200);
        }
    }

    public function delete(Quest $quest): JsonResponse
    {
        $quest->delete();

        $data = [
            'status' => 200,
            'message' => 'Quest deleted successfully'
        ];

        return response()->json($data, 200);
    }

//    public function show(Quest $quest): JsonResponse
//    {
//        $data = [
//            'status' => 200,
//            'quest' => $quest,
//
//        ];
//    }
}
