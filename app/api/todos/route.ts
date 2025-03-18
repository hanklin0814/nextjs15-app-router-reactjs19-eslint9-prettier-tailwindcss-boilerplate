import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/drizzle/db';
import { todos } from '@/drizzle/schema';
import { AppError } from '@/lib/http/classes/AppError';
import { AddToDoRequest, ToggleToDoRequest } from '@/types';

// Get all todos
export async function GET(request: NextRequest) {
  try {
    // 檢查請求方法
    if (request.method !== 'GET') {
      throw new AppError('HTTP', 'Method Not Allowed', 405);
    }

    const allTodos = await db.select().from(todos);

    return NextResponse.json({
      success: true,
      message: '取得成功',
      data: allTodos,
    });
  } catch (error) {
    console.error('Failed to fetch todo:', error);

    // 如果是已知的 AppError，直接回傳錯誤訊息
    if (error instanceof AppError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          statusCode: error.statusCode,
        },
        { status: error.statusCode }
      );
    }

    // 未知錯誤則回傳 500
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch todo',
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
// Create a new todo
export async function POST(request: NextRequest) {
  try {
    // 檢查請求方法
    if (request.method !== 'POST') {
      throw new AppError('HTTP', 'Method Not Allowed', 405);
    }

    const { title }: AddToDoRequest = await request.json();

    const [newTodo] = await db
      .insert(todos)
      .values({ title, completed: false })
      .returning(); // 確保返回新創建的記錄

    return NextResponse.json(
      {
        success: true,
        message: '新增成功',
        data: newTodo,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to add todo:', error);
    // 如果是已知的 AppError，直接回傳錯誤訊息
    if (error instanceof AppError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          statusCode: error.statusCode,
        },
        { status: error.statusCode }
      );
    }

    // 未知錯誤則回傳 500
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to add todo',
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
// Update a todo
export async function PUT(request: NextRequest) {
  try {
    // 檢查請求方法
    if (request.method !== 'PUT') {
      throw new AppError('HTTP', 'Method Not Allowed', 405);
    }

    const { id, completed }: ToggleToDoRequest = await request.json();
    await db.update(todos).set({ completed }).where(eq(todos.id, id));

    return NextResponse.json({
      success: true,
      message: '更新成功',
    });
  } catch (error) {
    console.error('Failed to update todo:', error);
    // 如果是已知的 AppError，直接回傳錯誤訊息
    if (error instanceof AppError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          statusCode: error.statusCode,
        },
        { status: error.statusCode }
      );
    }

    // 未知錯誤則回傳 500
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update todo',
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
// Delete a todo
export async function DELETE(request: NextRequest) {
  try {
    // 檢查請求方法
    if (request.method !== 'DELETE') {
      throw new AppError('HTTP', 'Method Not Allowed', 405);
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      throw new AppError('HTTP', '缺少 id 參數', 400);
    }

    await db.delete(todos).where(eq(todos.id, parseInt(id)));

    return NextResponse.json({
      success: true,
      message: '刪除成功',
    });
  } catch (error) {
    console.error('Failed to delete todo:', error);
    // 如果是已知的 AppError，直接回傳錯誤訊息
    if (error instanceof AppError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          statusCode: error.statusCode,
        },
        { status: error.statusCode }
      );
    }

    // 未知錯誤則回傳 500
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to deleted todo',
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
