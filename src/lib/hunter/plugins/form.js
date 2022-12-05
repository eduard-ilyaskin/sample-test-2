export class FormHuntingPlugin {
  static name = 'formHunting';

  _retries = new Map();

  _inputName = null;
  _phase = 'idle';
  _chars = 0;
  _timeSpend = 0;
  _timer = null;
  _value = null;

  constructor({ context }) {
    this.context = context;
  }

  register(element, name) {
    element.addEventListener('focus', (e) => {
      if (!e.target.name && !name) {
        return;
      }

      e.preventDefault();

      this._inputName = e.target.name ?? name;
      this._phase = 'pending';
    });

    element.addEventListener('input', (e) => {
      this._chars++;
      this._value = e.target.value;

      if (this._phase === 'input') {
        e.preventDefault();
        return;
      }

      this._timer = setInterval(() => {
        this._timeSpend += 200;
      }, 200);
      this._retries.set(e.target.name, (this._retries.get(this._inputName) || 0) + 1);
      this._phase = 'input';
    });

    element.addEventListener('blur', (e) => {
      if (this._phase !== 'input') {
        this._phase = 'idle';
        clearInterval(this._timer);
        return;
      }

      const data = this._getData(this._inputName);
      const inputsData = this.context.getPageData()?.inputs ?? {};
      this.context.setPageData({ inputs: { ...inputsData, [this._inputName]: data } });

      this._resetData();
      e.preventDefault();
    });
  }

  _getData(inputName) {
    return {
      name: this._inputName,
      chars: this._chars,
      timeSpend: this._timeSpend,
      retries: this._retries.get(inputName),
      value: this._value,
    };
  }

  _resetData() {
    this._inputName = null;
    this._phase = 'idle';
    this._chars = 0;
    this._timeSpend = 0;
    this._timer = clearInterval(this._timer);
    this._value = null;
  }
}
