'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('PR page error:', error);
  }, [error]);

  const getErrorMessage = () => {
    if (error.message.includes('Diff too large')) {
      return {
        title: 'Diff Too Large',
        message: 'This pull request has more than 3,000 lines of changes. Try viewing individual files instead.',
        suggestion: 'Large diffs are not supported by the GitHub API. Consider breaking down large changes into smaller pull requests.'
      };
    }
    
    if (error.message.includes('rate limit') || error.message.includes('403')) {
      return {
        title: 'Rate Limited',
        message: 'GitHub API rate limit exceeded. Please wait a moment before trying again.',
        suggestion: 'The GitHub API has a rate limit for unauthenticated requests. Try again in a few minutes.'
      };
    }

    if (error.message.includes('not found') || error.message.includes('404')) {
      return {
        title: 'Pull Request Not Found',
        message: 'The pull request you\'re looking for doesn\'t exist or may be private.',
        suggestion: 'Make sure the URL is correct and the repository is public.'
      };
    }

    return {
      title: 'Something went wrong',
      message: 'An error occurred while loading the pull request.',
      suggestion: 'This might be a temporary issue. Try refreshing the page or check your internet connection.'
    };
  };

  const errorInfo = getErrorMessage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-8">
      <div className="max-w-lg text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {errorInfo.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {errorInfo.message}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          {errorInfo.suggestion}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
          
          <Link
            href="/"
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}