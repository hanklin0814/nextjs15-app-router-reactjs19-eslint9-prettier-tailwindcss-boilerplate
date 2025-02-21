import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/drizzle/db';
import { todos } from '@/drizzle/schema';

// Get all todos
export async function GET() {
  try {
    const allTodos = await db.select().from(todos);
    console.log('Fetched Todos:', allTodos);

    return NextResponse.json(allTodos);
  } catch (error) {
    console.error('Failed to fetch todo:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}
// Create a new todo
export async function POST(req: Request) {
  try {
    const { title } = await req.json();
    const [newTodo] = await db
      .insert(todos)
      .values({ title, completed: false })
      .returning(); // 確保返回新創建的記錄

    return NextResponse.json(newTodo); // 直接回傳新 todo
  } catch (error) {
    console.error('Failed to add todo:', error);
    return NextResponse.json({ error: 'Failed to add todo' }, { status: 500 });
  }
}
// Update a todo
export async function PUT(req: Request) {
  try {
    const { id, completed } = await req.json();
    await db.update(todos).set({ completed }).where(eq(todos.id, id));
    return NextResponse.json({ message: 'Todo updated successfully' });
  } catch (error) {
    console.error('Failed to update todo:', error);
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    );
  }
}
// Delete a todo
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await db.delete(todos).where(eq(todos.id, id));
    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Failed to delete todo:', error);
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
}
