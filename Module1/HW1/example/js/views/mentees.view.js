'use strict';

var TEMPLATES_CONST = require('../CONSTANTS/templates.constants.js');
var menteesStore = require('../stores/mentees.store.js');
var actions = require('../actions/app.actions.js');
var view =  new seal.View(menteesView);

menteesStore.addChangeListener(function () {
    view.updateState();
});

module.exports = view;

function menteesView() {
    let _addButton;
    let _menteesList;

    let _menteeName;
    let _menteeSurname;
    let _menteeHasMentor;

    let _view = {
        init: init,

        setState: setState,
        updateState: updateState,

        updateView: updateView,

        render: render,
        afterRender: afterRender,

        destroy: destroy
    };

    return _view;

    function init() {
        _addButton = document.querySelector('.js-add-button');
        _menteesList = document.querySelector('.js-mentees-list');

        _menteeName = document.querySelector('.js-mentee-add-name');
        _menteeSurname = document.querySelector('.js-mentee-add-surname');
        _menteeHasMentor = document.querySelector('.js-mentee-add-mentor');

        if(_addButton) {
            _addButton.addEventListener('click', addMentee);
        }

        _view.updateState();
    }

    function updateState() {
        var data = menteesStore.getMentees();
        var state = {mentees: data};

        _view.setState(state);
    }

    function setState(state) {
        _view.state = _view.state || {};
        state = state || {};

        _view.state.mentees = state.mentees;

        _view.updateView();
    }

    function updateView() {
        _view.render();
        _view.afterRender();
    }

    function render() {
        var rawMenteeDatas = _view.state.mentees;
        var formartedMentees = TEMPLATES_CONST.MENTEES_CAPTION;

        rawMenteeDatas.forEach((mentee, index) => {
            formartedMentees += _formatMentee(mentee, index + 1);
        });

        if(_menteesList) {
            _menteesList.innerHTML = formartedMentees;
        }
    }

    function afterRender() {

    }

    function destroy() {

    }

    function addMentee(event) {
        event.preventDefault();
        actions.addMentee(_getNewMentee());
        _clearFields();
    }

    function _getNewMentee() {
        var newMentee = {};

        if(_menteeName) {
           newMentee.name = _menteeName.value;
        }

        if(_menteeSurname) {
            newMentee.surname = _menteeSurname.value;
        }

        if(_menteeHasMentor) {
            newMentee.mentor = _menteeHasMentor.checked;
        }

        return newMentee;
    }

    function _formatMentee(rawMenteeData, index) {
        var mentee = '<li class="list-body-row">' +
            '<div class="list-body-row__col">' + index;

        mentee += '</div><div class="list-body-row__col">';
        mentee += rawMenteeData.name;
        mentee += '</div><div class="list-body-row__col">';
        mentee += rawMenteeData.surname;
        mentee += '</div><div class="list-body-row__col">';
        mentee += rawMenteeData.mentor ? 'yes' : 'no';
        mentee += '</div></li>';

        return mentee;
    }

    function _clearFields() {
        if(_menteeName) {
            _menteeName.value = '';
        }

        if(_menteeSurname) {
            _menteeSurname.value = '';
        }

        if(_menteeHasMentor) {
            _menteeHasMentor.checked = false;
        }
    }

}