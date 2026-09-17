import { Project, ProjectStatus } from "../models/project.js";

// Project State Management
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    // Add new project
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active,
    );

    this.projects.push(newProject);
    this.updateListeners();
  }

  // switch status of project
  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice()); // for the list to re-render its items
    }
  }
}

// now, we have a couple of unclear questions:
// First: how do we call add project from inside our class down there when we gather our userInput from inside the submit handler?
// Second: How do we pass that updated list of projects whenever it changes to the project list class

export const projectState = ProjectState.getInstance(); // ==> Singeleton
