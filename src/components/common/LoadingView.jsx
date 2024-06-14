/**
 * Renders a loading state component with an optional message and minimum height.
 * @param message - The message to be displayed in the loading state.
 * @param minHeight - The minimum height of the loading state component. Defaults to 'min-h-[30vh]'.
 * @returns The loading view component.
 */
export default function LoadingView({ message, minHeight }) {
    return (
      <div
        className={`w-full ${
          minHeight ? minHeight : "min-h-[30vh]"
        } bg-gray-50 rounded-lg mt-6 py-6 flex flex-col items-center justify-center gap-6`}
      >
        {/* loading spinner */}
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-r-2 border-dashed border-gray-700" />
        <h1 className="text-xl font-semibold text-gray-700">{message}</h1>
      </div>
    )
  }
  