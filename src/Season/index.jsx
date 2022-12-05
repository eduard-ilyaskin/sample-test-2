import { useNavigate } from 'react-router-dom';
import { useRegisterInputHunting } from '../lib/hunter';

const seasons = ['', 'Winter', 'Spring', 'Summer', 'Autumn'];

export function QuestionSeason() {
  const navigate = useNavigate();
  const seasonHunting = useRegisterInputHunting('season');

  function handleSubmit(event) {
    event.preventDefault();
    navigate('/result');
  }

  return (
    <div>
      <h1>Question Page 1</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="season">How old are you?</label>
          <select name="season" id="season" ref={seasonHunting}>
            {seasons.map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Next</button>
      </form>
    </div>
  );
}
