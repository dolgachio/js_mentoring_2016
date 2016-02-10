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
    var _addButton;
    var _menteesList;

    var _menteeName;
    var _menteeSurname;
    var _menteeHasMentor;

    return {
        init: init,

        setState: setState,
        updateState: updateState,

        updateView: updateView,

        render: render,
        afterRender: afterRender,

        destroy: destroy
    };

    function init() {
        _addButton = document.querySelector('.js-add-button');
        _menteesList = document.querySelector('.js-mentees-list');

        _menteeName = document.querySelector('.js-mentee-add-name');
        _menteeSurname = document.querySelector('.js-mentee-add-surname');
        _menteeHasMentor = document.querySelector('.js-mentee-add-mentor');

        if(_addButton) {
            _addButton.addEventListener('click', addMentee);
        }

        this.updateState();
    }

    function updateState() {
        var data = menteesStore.getMentees();
        var state = {mentees: data};

        this.setState(state);
    }

    function setState(state) {
        this.state = this.state || {};
        state = state || {};

        this.state.mentees = state.mentees;

        this.updateView();
    }

    function updateView() {
        this.render();
        this.afterRender();
    }

    function render() {
        var rawMentees = this.state.mentees;
        var formartedMentees = TEMPLATES_CONST.MENTEES_CAPTION;

        rawMentees.forEach((mentee) => {
            formartedMentees += _formatMentee(mentee);
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

    function _formatMentee(rawMentee) {
        var mentee = '<li class="list-body-row">' +
            '<div class="list-body-row__col">#</div>' +
            '<div class="list-body-row__col">';

        mentee += rawMentee.name;
        mentee += '</div><div class="list-body-row__col">';
        mentee += rawMentee.surname;
        mentee += '</div><div class="list-body-row__col">';
        mentee += !!rawMentee.mentor;
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