import { Spinner } from "./spinner";

export function LoadingState({
  message = "Carregando...",
}: {
  message?: string;
}) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-3 px-4 text-gray-500">
      <Spinner size="lg" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

export function ErrorMessage({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="border border-red-200 bg-red-50 px-4 py-4 sm:px-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium leading-5 text-red-700">{message}</p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="w-fit cursor-pointer border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-100"
          >
            Tentar novamente
          </button>
        )}
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="border border-gray-200 bg-white px-5 py-10 text-center sm:px-8">
      <h2 className="text-lg font-bold tracking-tight text-gray-950 sm:text-xl">
        {title}
      </h2>

      {description && (
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
}
