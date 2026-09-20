type Goal = {
  id: number;
  title: string;
  description: string;
};

interface CourseGoalsProps {
  goals: Goal[];
  onDelete: (id: number) => void;
}

export default function CourseGoals({ goals, onDelete }: CourseGoalsProps) {
  return (
    <ul>
      {goals.map((goal) => (
        <li>
          <article>
            <div>
              <h2>{goal.title}</h2>
              <p>{goal.description}</p>
            </div>
            <button onClick={() => onDelete(goal.id)}>Delete</button>
          </article>
        </li>
      ))}
    </ul>
  );
}
