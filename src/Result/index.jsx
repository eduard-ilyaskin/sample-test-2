import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHunting } from '../lib/hunter';

export function Result() {
  const navigate = useNavigate();
  const hunting = useHunting();
  const metaData = hunting.getMetaData();

  useEffect(() => {
    if (metaData.pages.length < 3) {
      navigate('/');
    }
  }, [metaData]);

  useEffect(() => {
    return () => {
      hunting.clearMetaDataCache();
    };
  }, []);

  function calculateInputsAVG(inputs) {
    return Object.keys(inputs).reduce((acc, key) => inputs[key].timeSpend + acc, 0);
  }

  return (
    <div>
      <div>
        <h3>Browser Information</h3>
        <table>
          <thead>
            <tr>
              <th>Browser Name</th>
              <th>full version</th>
              <th>major version</th>
              <th>device</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{metaData.browser.browserName}</td>
              <td>{metaData.browser.fullVersion}</td>
              <td>{metaData.browser.majorVersion}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3>User Information</h3>

        <table>
          <thead>
            <tr>
              <th>IP</th>
              <th>city</th>
              <th>country code</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{metaData.user.ip}</td>
              <td>{metaData.user.city}</td>
              <td>{metaData.user.countryCode}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3>Page Information</h3>

        <ul>
          {metaData.pages.map((page) => (
            <li key={page.page}>
              {page.page}

              <ul>
                <li>
                  Total Time: {page.timeSpend}ms or {page.timeSpend / 1000}s
                </li>
                <li>
                  Time spent between first input and last input:{' '}
                  {calculateInputsAVG(page.data.inputs)}
                  ms
                </li>

                <li>
                  Number of changes (edits) made to the input:{' '}
                  {Object.keys(page.data.inputs)
                    .map((key) => {
                      const field = page.data.inputs[key];
                      return `${field.name}(${field.chars} characters and ${field.retries} retries and value is: ${field.value})`;
                    })
                    .join(', ')}
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Full JSON Details</h3>
        <pre>{JSON.stringify(metaData, null, 2)}</pre>
      </div>

      <button onClick={() => navigate('/')}>go back</button>
    </div>
  );
}
