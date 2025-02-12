<?php

namespace App\Http\Controllers;

use App\Models\Quest;
use App\Models\Rating;
use App\Models\User;
use App\Http\Requests\StoreRatingRequest;
use App\Http\Requests\UpdateRatingRequest;
use http\Env\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class RatingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ratings = Rating::all();

        $data = [
            'status' => 200,
            'ratings' => $ratings
        ];
        return response()->json($data, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'quest_id' => ['required', 'integer', 'min:0', 'exists:quests,id'],
            'rating' => ['required', 'integer', 'min:0', 'max:5'],
            'comment' => ['nullable', 'string', 'max: 65535']
        ]);

        if ($validator->fails()) {
            $data = [
                'status' => 422,
                'message' => $validator->messages()
            ];
            return response()->json($data, 422);
        }
        else {
            $rating = new Rating();
            $rating->quest_id = $request->quest_id;
            $rating->rating = $request->rating;
            $rating->comment = $request->comment;

            $rating->save();

            $data = [
                'status' => 200,
                'message' => 'Rating created successfully'
            ];

            return response()->json($data, 200);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Rating $rating): JsonResponse
    {
        $data = [
            'status' => 200,
            'rating' => $rating
        ];

        return response()->json($data, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Rating $rating)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Rating $rating)
    {
        $validator = Validator::make($request->all(), [
            'rating' => ['required', 'integer', 'min:0', 'max:5'],
            'comment' => ['nullable', 'string', 'max: 65535']
        ]);

        if ($validator->fails()) {
            $data = [
                'status' => 422,
                'message' => $validator->messages()
            ];
            return response()->json($data, 422);
        }
        else {
            $rating->rating = $request->rating;
            $rating->comment = $request->comment;

            $rating->save();

            $data = [
                'status' => 200,
                'message' => 'Rating updated successfully'
            ];

            return response()->json($data, 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rating $rating)
    {
        $rating->delete();

        $data = [
            'status' => 200,
            'message' => 'Rating deleted successfully'
        ];

        return response()->json($data, 200);
    }

    public function getUserRatings(User $user) {
        $ratings = $user->ratings()->get();
        $data = [
            'status' => 200,
            'ratings' => $ratings
        ];
        return response()->json($data, 200);
    }

    public function getQuestRatings(Quest $quest) {
        $ratings = $quest->ratings()->get();

        $data = [
            'status' => 200,
            'ratings' => $ratings
        ];

        return response()->json($data, 200);
    }
}
