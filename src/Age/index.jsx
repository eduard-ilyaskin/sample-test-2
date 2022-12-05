import { useNavigate } from 'react-router-dom';
import { useRegisterInputHunting } from '../lib/hunter';

export function QuestionAge() {
  const navigate = useNavigate();
  const ageHunting = useRegisterInputHunting('age');

  function handleSubmit(event) {
    event.preventDefault();
    navigate('/season-question');
  }

  return (
    <div>
      <h1>Question Page 1</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="age">How old are you?</label>
          <input type="number" id="age" name="age" placeholder="Age" ref={ageHunting} required />
        </div>

        <button type="submit">Next</button>
      </form>
    </div>
  );
}
