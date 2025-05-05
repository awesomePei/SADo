import TodoForm from "@/components/todos/todo-form";
import TodoList from "@/components/todos/todo-list";
import { todoApi } from "@/lib/api/todos";
import { CreateTodoPayload } from "@/types/todo";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default function Home() {
  async function createTodo(todo: CreateTodoPayload) {
    "use server";
    await todoApi.createTodo(todo);
    revalidatePath("/");
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
        SADo
      </h1>
      <h2 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
        hi
      </h2>
      <div className="max-w-2xl mx-auto space-y-8">
        <TodoForm onSubmit={createTodo} />
        <TodoList />
      </div>
    </main>
  );
}
