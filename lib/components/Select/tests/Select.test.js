'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Placeholder', function () {
  test('Renders a placeholder if defined', function () {
    var placeholder = 'Choose your co-anchor…';
    var options = ['Champ Kind', 'Brian Fantana', 'Brick Tamland'];
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { options: options, placeholder: placeholder }));
    var select = wrapper.find('select');
    var selectOptions = select.children();

    expect(selectOptions.first().prop('label')).toBe(placeholder);
  });

  test('Does not render a placeholder if a value is passed', function () {
    var placeholder = 'Choose your co-anchor…';
    var options = ['Champ Kind', 'Brian Fantana', 'Brick Tamland'];
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { options: options, placeholder: placeholder, value: 'Brick Tamland' }));
    var select = wrapper.find('select');
    var selectOptions = select.children();

    expect(selectOptions.first().prop('label')).not.toBe(placeholder);
  });
});

describe('Option', function () {
  test('Renders with a single string', function () {
    var options = 'Brick Tamland';
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { options: options }));
    var selectOptions = wrapper.find('select').children();

    expect(selectOptions.first().prop('value')).toBe(options);
    expect(selectOptions.first().text()).toBe(options);
  });

  test('Renders with an array of strings', function () {
    var options = ['Champ Kind', 'Brian Fantana', 'Brick Tamland'];
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { options: options }));
    var selectOptions = wrapper.find('select').children();

    expect(selectOptions.first().text()).toBe('Champ Kind');
    expect(selectOptions.length).toBe(options.length);
  });

  test('Renders with a correct object schema', function () {
    var options = {
      label: 'Champ Kind',
      value: 'champ',
      disabled: true
    };
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { options: options }));
    var selectOptions = wrapper.find('select').children();
    var o = selectOptions.first();

    expect(o.prop('value')).toBe(options.value);
    expect(o.text()).toBe(options.label);
    expect(o.prop('disabled')).toBeTruthy();
  });
});

describe('Group', function () {
  test('Renders optgroup if the options.value is an array', function () {
    var options = {
      label: 'Group',
      value: ['Champ Kind', 'Brian Fantana', 'Brick Tamland']
    };
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { options: options }));
    var group = wrapper.find('optgroup');
    var option = group.children().first();

    expect(group.exists()).toBeTruthy();
    expect(group.prop('label')).toBe(options.label);
    expect(group.children().length).toBe(options.value.length);
    expect(option.exists()).toBeTruthy();
    expect(option.text()).toBe(options.value[0]);
  });

  test('Can render an optgroup of one', function () {
    var options = {
      label: 'Group',
      value: ['Brick Tamland']
    };
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { options: options }));
    var group = wrapper.find('optgroup');
    var option = group.children().first();

    expect(group.exists()).toBeTruthy();
    expect(group.children().length).toBe(options.value.length);
    expect(option.exists()).toBeTruthy();
    expect(option.text()).toBe(options.value[0]);
  });

  test('Can render multiple optgroups', function () {
    var options = [{
      label: 'Channel 4',
      value: ['Ron Burgandy', 'Champ Kind', 'Brian Fantana', 'Brick Tamland']
    }, {
      label: 'Evening',
      value: ['Wes Mantooth']
    }, {
      label: 'Channel 2',
      value: ['Frank Vitchard']
    }, {
      label: 'Spanish Language News',
      value: ['Arturo Mendez']
    }];
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { options: options }));
    var groups = wrapper.find('optgroup');

    expect(groups.exists()).toBeTruthy();
    expect(groups.length).toBe(options.length);
    expect(groups.first().children().length).toBe(options[0].value.length);
  });
});

describe('Value', function () {
  test('Selects the value if defined', function () {
    var value = 'Brian Fantana';
    var options = ['Champ Kind', 'Brian Fantana', 'Brick Tamland'];
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { options: options, value: value }));
    var select = wrapper.find('select');

    expect(select.prop('value')).toBe(value);
  });
});

describe('Events', function () {
  test('onChange callback passes selected value', function () {
    var result = '';
    var onChange = function onChange(value) {
      result = value;
    };
    var options = ['Champ Kind', 'Brian Fantana', 'Brick Tamland'];
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { options: options, onChange: onChange }));

    wrapper.find('select').simulate('change');
    expect(result).toBe(options[0]);
  });
});

describe('Prefix', function () {
  test('Adds prefix if defined', function () {
    var options = ['Champ Kind', 'Brian Fantana', 'Brick Tamland'];
    var prefix = 'Pick one';
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { options: options, prefix: prefix }));

    expect(wrapper.find('.c-Select__prefix').text()).toBe(prefix);
  });
});

describe('States', function () {
  test('Disables select if disabled prop is true', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { disabled: true }));
    var o = wrapper.find('select');

    expect(o.prop('disabled')).toBeTruthy();
  });

  describe('Error', function () {
    test('Applies error styles if error prop is true', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { error: true }));
      var o = wrapper.find('.c-Select');

      expect(o.prop('className')).toContain('is-error');
    });

    test('Adds error helper text if error prop is a string', function () {
      var message = 'Cannonballlll';
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { error: message }));
      var o = wrapper.find('.c-InputHelperLabel');

      expect(o.text()).toContain(message);
    });
  });

  describe('Success', function () {
    test('Applies success styles if success prop is true', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { success: true }));
      var o = wrapper.find('.c-Select');

      expect(o.prop('className')).toContain('is-success');
    });

    test('Adds success helper text if success prop is a string', function () {
      var message = 'Cannonballlll';
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { success: message }));
      var o = wrapper.find('.c-InputHelperLabel');

      expect(o.text()).toContain(message);
    });
  });

  describe('Warning', function () {
    test('Applies warning styles if warning prop is true', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { warning: true }));
      var o = wrapper.find('.c-Select');

      expect(o.prop('className')).toContain('is-warning');
    });

    test('Adds warning helper text if warning prop is a string', function () {
      var message = 'Cannonballlll';
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { warning: message }));
      var o = wrapper.find('.c-InputHelperLabel');

      expect(o.text()).toContain(message);
    });
  });
});

describe('Styles', function () {
  test('Adds seamless styles if defined', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { seamless: true }));
    var o = wrapper.find('.c-Select');

    expect(o.prop('className')).toContain('is-seamless');
  });

  test('Adds sizing styles if defined', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { size: 'sm' }));
    var o = wrapper.find('.c-InputField');

    expect(o.prop('className')).toContain('is-sm');
  });
});