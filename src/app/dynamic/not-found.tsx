import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-8">
      <div className="max-w-md text-center">
        Set the 'auth' cookie to 'true' to view this page
      </div>
    </div>
  );
}