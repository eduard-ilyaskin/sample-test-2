import { useNavigate } from 'react-router-dom';
import { useRegisterInputHunting } from '../lib/hunter';

export function Login() {
  const navigate = useNavigate();
  const usernameHunting = useRegisterInputHunting('username');
  const passwordHunting = useRegisterInputHunting('password');

  function handleSubmit(event) {
    event.preventDefault();
    navigate('/age-question');
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            ref={usernameHunting}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            ref={passwordHunting}
            required
          />
        </div>

        <button type="submit">Next</button>
      </form>
    </div>
  );
}
