interface GitHubPullRequest {
    id: number;
    number: number;
    title: string;
    body: string;
    state: string;
    user: {
      login: string;
      avatar_url: string;
    };
    head: {
      sha: string;
      ref: string;
      repo: {
        name: string;
        full_name: string;
      } | null;
    };
    base: {
      sha: string;
      ref: string;
      repo: {
        name: string;
        full_name: string;
      };
    };
    diff_url: string;
    patch_url: string;
    html_url: string;
    created_at: string;
    updated_at: string;
    additions: number;
    deletions: number;
    changed_files: number;
  }
  
  interface GitHubPullRequestFile {
    sha: string;
    filename: string;
    status: 'added' | 'removed' | 'modified' | 'renamed' | 'copied' | 'changed' | 'unchanged';
    additions: number;
    deletions: number;
    changes: number;
    blob_url: string;
    raw_url: string;
    contents_url: string;
    patch?: string;
  }
  
  interface GitHubUser {
    login: string;
    avatar_url: string;
    html_url: string;
  }
  
  interface GitHubIssueComment {
    id: number;
    body: string;
    user: GitHubUser;
    created_at: string;
    updated_at: string;
    html_url: string;
  }
  
  interface GitHubReviewComment {
    id: number;
    body: string;
    user: GitHubUser;
    created_at: string;
    updated_at: string;
    html_url: string;
    path: string;
    position: number | null;
    line: number | null;
    commit_id: string;
    diff_hunk: string;
  }
  
  export class GitHubApi {
    private readonly baseUrl = 'https://api.github.com';
  
    private async fetchWithRetry(url: string, options: RequestInit = {}, retries = 3): Promise<Response> {
      const token = process.env.GITHUB_TOKEN;
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url, {
            ...options,
            headers: {
              'User-Agent': 'faster-github-app',
              'Accept': 'application/vnd.github+json',
              ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
              ...options.headers,
            },
          });
  
          if (response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0') {
            const resetTime = response.headers.get('x-ratelimit-reset');
            if (resetTime && i < retries - 1) {
              const waitTime = Math.min((parseInt(resetTime) * 1000) - Date.now(), 60000);
              if (waitTime > 0) {
                await new Promise(resolve => setTimeout(resolve, waitTime));
                continue;
              }
            }
          }
  
          return response;
        } catch (error) {
          if (i === retries - 1) throw error;
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
        }
      }
      throw new Error('Failed to fetch after retries');
    }
  
    async getPullRequest(owner: string, repo: string, prNumber: string): Promise<GitHubPullRequest> {
      const url = `${this.baseUrl}/repos/${owner}/${repo}/pulls/${prNumber}`;
      const response = await this.fetchWithRetry(url);
  
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Pull request not found');
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }
  
      return response.json();
    }
  
    async getPullRequestFiles(owner: string, repo: string, prNumber: string): Promise<GitHubPullRequestFile[]> {
      const url = `${this.baseUrl}/repos/${owner}/${repo}/pulls/${prNumber}/files`;
      const response = await this.fetchWithRetry(url);
  
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
  
      return response.json();
    }
  
    async getPullRequestDiff(owner: string, repo: string, prNumber: string): Promise<string> {
      const url = `${this.baseUrl}/repos/${owner}/${repo}/pulls/${prNumber}`;
      const response = await this.fetchWithRetry(url, {
        headers: {
          'Accept': 'application/vnd.github.v3.diff',
        },
      });
  
      if (!response.ok) {
        if (response.status === 406) {
          throw new Error('Diff too large (exceeds 3,000 lines). Try viewing individual files.');
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }
  
      return response.text();
    }
  
    async getFileContent(owner: string, repo: string, sha: string, path: string): Promise<string> {
      const url = `https://raw.githubusercontent.com/${owner}/${repo}/${sha}/${path}`;
      const response = await this.fetchWithRetry(url);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch file content: ${response.status}`);
      }
  
      return response.text();
    }
  
    async getFileLines(owner: string, repo: string, sha: string, path: string, startLine: number, endLine: number): Promise<string[]> {
      try {
        const content = await this.getFileContent(owner, repo, sha, path);
        const lines = content.split('\n');
        return lines.slice(Math.max(0, startLine - 1), Math.min(lines.length, endLine));
      } catch (error) {
        console.error('Failed to fetch file lines:', error);
        return [];
      }
    }
  
    async getPullRequestIssueComments(owner: string, repo: string, prNumber: string): Promise<GitHubIssueComment[]> {
      const url = `${this.baseUrl}/repos/${owner}/${repo}/issues/${prNumber}/comments`;
      const response = await this.fetchWithRetry(url);
  
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
  
      return response.json();
    }
  
    async getPullRequestReviewComments(owner: string, repo: string, prNumber: string): Promise<GitHubReviewComment[]> {
      const url = `${this.baseUrl}/repos/${owner}/${repo}/pulls/${prNumber}/comments`;
      const response = await this.fetchWithRetry(url);
  
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
  
      return response.json();
    }
  }