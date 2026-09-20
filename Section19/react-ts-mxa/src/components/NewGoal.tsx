import { useRef, type SubmitEvent } from "react";

interface NewGoalProps {
  onAdd: (text: string, summary: string) => void;
}

export default function NewGoal({ onAdd }: NewGoalProps) {
  const goalRef = useRef<HTMLInputElement>(null);
  const sumamryRef = useRef<HTMLInputElement>(null);

  function handleSumbit(event: SubmitEvent) {
    event.preventDefault();

    const enteredGoal = goalRef.current!.value;
    const enteredSummary = sumamryRef.current!.value;

    // validation ...
    onAdd(enteredGoal, enteredSummary);
  }

  return (
    <form onSubmit={handleSumbit}>
      <p>
        <label htmlFor="goal">Your Goal</label>
        <input id="goal" type="text" ref={goalRef} />
      </p>
      <p>
        <label htmlFor="summary">Short Summary</label>
        <input id="summary" type="text" ref={sumamryRef} />
      </p>
      <p>
        <button>Add Goal</button>
      </p>
    </form>
  );
}
