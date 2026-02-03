using System;

namespace SafeMind.Core.Responses
{
    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public T? Data { get; set; }
        public DateTime Timestamp { get; set; }

        public ApiResponse(bool success, string message, T? data)
        {
            Success = success;
            Message = message;
            Data = data;
            Timestamp = DateTime.UtcNow;
        }

        public static ApiResponse<T> SuccessResponse(string message, T? data)
        {
            return new ApiResponse<T>(true, message, data);
        }

        public static ApiResponse<T> FailureResponse(string message)
        {
            return new ApiResponse<T>(false, message, default);
        }
    }

    // Helper for non-generic responses if needed, though strictly following Java we might stick to <object>
    public static class ApiResponse
    {
         public static ApiResponse<object> Success(string message, object? data = null)
         {
             return new ApiResponse<object>(true, message, data);
         }

         public static ApiResponse<object> Failure(string message)
         {
             return new ApiResponse<object>(false, message, null);
         }
    }
}
