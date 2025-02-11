<?php

declare(strict_types=1);

namespace App\Http\Requests\Api\V1\Quest;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class CreateQuestRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'time_limit' => ['nullable', 'integer', 'min:1'],

            'tasks' => ['required', 'array', 'min:1'],
            'tasks.*.name' => ['required', 'string', 'max:255'],
            'tasks.*.description' => ['nullable', 'string'],
            'tasks.*.points' => ['nullable', 'integer', 'min:0'],

            'tasks.*.answer_options' => ['required', 'array', 'min:2'],
            'tasks.*.answer_options.*.name' => ['required', 'string', 'max:255'],
            'tasks.*.answer_options.*.is_correct' => ['required', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'tasks.required' => 'At least one task is required for the quest',
            'tasks.min' => 'At least one task is required for the quest',
            'tasks.*.answer_options.required' => 'Each task must have at least two answer options',
            'tasks.*.answer_options.min' => 'Each task must have at least two answer options',
        ];
    }

    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(
            response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422)
        );
    }
}
