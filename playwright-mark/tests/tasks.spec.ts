import { expect, test  } from "@playwright/test";
import { TaskModel } from "./fixtures/task.model";
import { deleteTaskByHelper, postTask } from "./support/helpers"
import { TasksPage } from "./support/pages/tasks";
import  data from "./fixtures/tasks.json"

let tasksPage: TasksPage

test.beforeEach(({page}) => {
  tasksPage = new TasksPage(page)
})

test.describe('Cadastro', ()=> {
  
  test("deve poder cadastrar uma nova tarefa", async ({ page, request }) => {
    const task = data.sucess as TaskModel
  
    await deleteTaskByHelper(request, task.name);
  
    await tasksPage.go()
    await tasksPage.create(task)
    await tasksPage.shouldHaveText(task.name)
  
    await page.waitForTimeout(2000);
  });
  
  test("não deve permitir tarefa duplicada", async ({ page, request }) => {
    const task = data.duplicate as TaskModel
  
    await deleteTaskByHelper(request, task.name);
    await postTask(request, task);
  
    await tasksPage.go()
    await tasksPage.create(task)
    await tasksPage.alertHaveTest('Task already exists!')
  
    await page.waitForTimeout(2000);
  });
  
  test('Campo obrigátorio', async ({ page }) => {
    const task = data.required as TaskModel
  
    await tasksPage.go()
    await tasksPage.create(task)
  
    const validationMessage = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
    expect(validationMessage).toEqual('This is a required field')
  
    await page.waitForTimeout(2000);
  });
})

test.describe('Atualização', ()=> {
  
  test('deve concluir um tarefa', async({ page, request }) => {
    const task = data.update as TaskModel
  
    await deleteTaskByHelper(request, task.name)
    await postTask(request, task)
    await tasksPage.go()
    await tasksPage.toggle(task.name)
    await tasksPage.shouldbeDone(task.name)
    
    await page.waitForTimeout(2000);
  });
});


test.describe('Exclusão', ()=> {
  
  test('deve excluir um tarefa', async({ page, request }) => {
    const task = data.delete as TaskModel
  
    await deleteTaskByHelper(request, task.name)
    await postTask(request, task)
    
    await tasksPage.go()
    await tasksPage.remove(task.name)
    await tasksPage.shouldNotExist(task.name)
    
    await page.waitForTimeout(2000);
  });
});

