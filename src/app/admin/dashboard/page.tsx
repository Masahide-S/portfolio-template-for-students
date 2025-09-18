"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Preview from '@/components/admin/Preview';
import Editor, { OnMount } from '@monaco-editor/react';

export default function DashboardPage() {
  const [content, setContent] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const editorRef = useRef<any>(null); // エディタのインスタンスを保持

  // ページロード時にデータを取得
  useEffect(() => {
    fetch('/api/content')
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => {
        setContent(data);
      })
      .catch(() => router.push('/admin/login'));
  }, [router]);

  // エディタのマウント時にインスタンスを保存
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  // 編集内容をプレビューにリアルタイム反映
  const handleEditorChange = (value: string | undefined) => {
    if (value === undefined) return;
    try {
      setContent(JSON.parse(value));
    } catch (error) {
      // JSON形式が正しくない入力途中の場合はプレビューを更新しない
    }
  };

  // 保存処理
  const handleSave = async () => {
    if (!editorRef.current) return;
    
    setIsSaving(true);
    // 1. 保存前にエディタの内容を強制的にフォーマット
    await editorRef.current.getAction('editor.action.formatDocument').run();
    
    // 2. 整形後の最新のテキストを取得
    const formattedContent = editorRef.current.getValue();
    
    try {
      const parsedContent = JSON.parse(formattedContent);
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedContent),
      });
      setContent(parsedContent); // プレビュー用のstateも更新
      alert('保存しました！');
    } catch (error) {
      alert('JSONの形式が正しくないため、保存できませんでした。');
    }
    setIsSaving(false);
  };

  // ログアウト処理
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
            // 👇 valueをdefaultValueに変更
            defaultValue={JSON.stringify(content, null, 2)}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            options={{
              wordWrap: 'on',
              minimap: { enabled: false },
              // 👇 これらのオプションで入力時の自動整形が有効になる
              formatOnType: true,
              formatOnPaste: true,
              autoIndent: 'full',
            }}
          />
        </div>
      </div>
    </div>
  );
}