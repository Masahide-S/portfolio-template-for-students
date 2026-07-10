"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Preview from '@/components/admin/Preview';
import Editor, { OnMount } from '@monaco-editor/react';
import { getContent, saveContent } from './actions';
import type { SiteData } from '@/types';

export default function DashboardPage() {
  const [content, setContent] = useState<Partial<SiteData> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);

  useEffect(() => {
    // このページはmiddlewareによって保護されているため、
    // 表示された時点で認証済みであることが保証されています。
    getContent().then(data => {
      if (data) {
        setContent(data);
      } else {
        // もし何らかの理由でデータが取得できなかった場合はログインページに戻す
        console.error("Authenticated but failed to fetch content.");
        router.push('/admin/login');
      }
    });
  }, [router]);

  const handleEditorDidMount: OnMount = (editor, _monaco) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value === undefined) return;
    try {
      setContent(JSON.parse(value));
    } catch (_error) {
      // JSON形式が正しくない入力途中の場合はプレビューを更新しない
    }
  };

  const handleSave = async () => {
    if (!editorRef.current) return;

    setIsSaving(true);
    const currentContent = editorRef.current.getValue();

    try {
      const parsedContent = JSON.parse(currentContent);
      const result = await saveContent(parsedContent);

      if (result.success) {
        setContent(parsedContent);
        alert('保存しました！');
      } else {
        alert('保存に失敗しました。');
      }
    } catch (_error) {
      alert('JSONの形式が正しくないため、保存できませんでした。');
    }
    setIsSaving(false);
  };

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/');
  };

  if (!content) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-base text-text-main">
      <div className="w-1/2 border-r border-primary/10 overflow-hidden">
        <Preview content={content} />
      </div>
      <div className="w-1/2 grid grid-rows-[auto,1fr]">
        <div className="p-4 border-b border-surface flex-shrink-0 flex justify-between items-center">
          <h1 className="text-xl font-bold">Content Editor</h1>
          <div className="flex items-center gap-4">
            <button onClick={handleSave} disabled={isSaving} className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50">
              {isSaving ? '保存中...' : '保存'}
            </button>
            <button onClick={handleLogout} className="px-4 py-2 bg-gray-600 text-white rounded-md">
              ログアウト
            </button>
          </div>
        </div>
        <div className="relative">
          <Editor
            height="100%"
            language="json"
            theme="vs-dark"
            defaultValue={JSON.stringify(content, null, 2)}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            options={{
              wordWrap: 'on',
              minimap: { enabled: false }
            }}
          />
        </div>
      </div>
    </div>
  );
}