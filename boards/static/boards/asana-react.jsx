var TODO_COLUMN = {name: 'To Do:', id: -1,'status':'new', tasks: []};
var PHOTO_SIZE = 'image_36x36';

function getDemoBoard() {
  var projectId = 1;
  var photo = {};
  photo[PHOTO_SIZE] = 'head.png';
  var user = { photo: photo, name: 'bob' };
  tasks = [
    {
      name: 'Blocked:',
      id: 101,
      assignee: user,
    },
    {
      name: 'Done:',
      id: 102,
      assignee: user,
    },
    {
      name: '[13] Bacon ipsum dolor amet quis picanha reprehenderit meatloaf lorem.',
      id: 2,
      assignee: user,
      completed: true,
      tags: [ { id: 10002, name: 'bug', color: 'light-yellow' } ]
    },
    {
      name: '[13] Learn Python',
      id: 22,
      assignee: user,
      completed: true,
      tags: [ { id: 10002, name: 'education', color: null } ]
    },
    {
      name: 'QA:',
      id: 103,
      assignee: user,
    },
    {
      name: 'Code Review:',
      id: 104,
      assignee: user,
    },
    {
      name: '[1] Lorum ipsum bacon dolar.',
      id: 200,
      assignee: user,
      tags: [ { id: 10001, name: 'orange', color: 'dark-orange' } ]
    },
    {
      name: '[1] Lorum ipsum bacon dolar.',
      id: 201,
      assignee: user,
      tags: [ { id: 10001, name: 'purple', color: 'dark-purple' } ]
    },
    {
      name: '[1] Lorum ipsum bacon dolar.',
      id: 202,
      assignee: user,
      tags: [ { id: 10001, name: 'gray', color: 'dark-warm-gray' } ]
    },
    {
      name: '[1] Lorum ipsum bacon dolar.',
      id: 203,
      assignee: user,
      tags: [ { id: 10001, name: 'lpink', color: 'light-pink' } ]
    },
    {
      name: '[1] Lorum ipsum bacon dolar.',
      id: 204,
      assignee: user,
      tags: [
        { id: 10001, name: 'lgreen', color: 'light-green' },
        { id: 10001, name: 'lyellow', color: 'light-yellow' },
        { id: 10001, name: 'lorange', color: 'light-orange' },
        { id: 10001, name: 'lpurple', color: 'light-purple' },
        { id: 10001, name: 'lwarm-gray', color: 'light-warm-gray' },
      ]
    },
    {
      name: '[1] Lorum ipsum bacon dolar.',
      id: 205,
      assignee: user,
      tags: [
        { id: 10001, name: 'lblue', color: 'light-blue' },
        { id: 10001, name: 'lred', color: 'light-red' },
        { id: 10001, name: 'lteal', color: 'light-teal' },
      ]
    },
    {
      name: 'In Progress:',
      id: 3,
      assignee: user,
    },
    {
      name: '[3] Learn Django',
      id: 4,
      assignee: user,
      tags: [ { id: 10001, name: 'brown', color: 'dark-brown' } ]
    },
    {
      name: 'To Do:',
      id: 5,
      assignee: user,
    },
    {
      name: '[Bug] It doesn\'t work!',
      id: 6,
      assignee: user,
      tags: [
        { id: 10001, name: 'blocker', color: 'dark-pink' },
        { id: 10002, name: 'bug', color: 'light-yellow' },
      ]
    },
    {
      name: '[.5] Lorum ipsum bacon dolar.',
      id: 7,
      assignee: user,
      tags: [ { id: 10001, name: 'blocker', color: 'dark-pink' } ]
    },
    {
      name: '[11] Learn HTML5',
      id: 9,
      assignee: user,
      tags: [ { id: 10001, name: 'green', color: 'dark-green' } ]
    },
    {
      name: '[8] Learn Angular',
      id: 11,
      assignee: user,
      tags: [ { id: 10001, name: 'blue', color: 'dark-blue' } ]
    },
    {
      name: '[8] Learn CSS',
      id: 12,
      assignee: user,
      tags: [ { id: 10001, name: 'red', color: 'dark-red' } ]
    },
    {
      name: '[3] Learn HTML5',
      id: 13,
      assignee: user,
      tags: [ { id: 10001, name: 'teal', color: 'dark-teal' } ]
    },
  ];
  return createBoard(tasks);
}

function createBoard(tasks) {
  var currentSection;
  var board = [];
  tasks.forEach(function(task){
      if (isSectionTask(task)) {
        task.tasks = [];
        board.push(task);
        currentSection = task;
      } else {
        if (!currentSection) {
          board.push(TODO_COLUMN);
          currentSection = TODO_COLUMN;
        }
        board[board.length - 1].tasks.push(task)
      }
  });
  return board;
}

function isSectionTask(task) {
  return ':' == task.name.charAt(task.name.length-1);
}

function getUserImage(user) {
  if (user) {
    if (user.photo) {
      return user.photo[PHOTO_SIZE];
    }
  }
  return 'head2.png';
}

var Card = React.createClass({
  render: function () {
      var task = this.props.task;
      // strip out the bracketed number and show that separately
      var taskAry = /(.*)\[([^\]]*)\]\s*(.*)/.exec(task.name);
      var taskName = '';
      var taskValue = '';
      if (taskAry && isFinite(taskAry[2])) {
        taskName = taskAry[1] + taskAry[3];
        taskValue = taskAry[2];
        task.point_value = parseInt(taskValue);
        task.pretty_name = taskName;
      } else {
        taskName = task.name;
        task.point_value = 0;
        task.pretty_name = task.name;
      }

      var assigneeId = task.id + '_assignee';
      var assigneeImage = getUserImage(task.assignee);
      var assigneeImgId = "assignee_img_" + task.id;
      var taskIdCheckbox = task.id + "-checkbox";

      return (
        <div className="cardContainer" draggable="true">
          <div className="cardPadding">
            <div className="plus hidden">
              <svg className="icon" viewBox="0 0 5 5" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z" /></svg></div>
              <div className="load hidden">
                <svg className="icon" viewBox="0 0 2 2" xlmns="http://www.w3.org/2000/svg">
                <circle cx="1" cy="1" r="1" /></svg>
              </div>
            </div>
            <div className="card" id={task.id}>
              <span className="ui-icon ui-icon-extlink zoomin hidden"></span>
              <div className="personDone">
                <div className="cardAssignee" >
                  <img id={assigneeImgId} src={assigneeImage} title="Click to assign"/>
                </div>
                <input className="cardComplete" id={taskIdCheckbox} type="checkbox" checked={task.completed}/><label className="cardComplete" htmlFor={taskIdCheckbox}></label>
              </div>
              <div className="titlevalue">
                <div className="titleContainer"><textarea className="cardTitle" value={taskName}></textarea></div>
                <div className="valueContainer"><textarea className="cardValue" value={taskValue}></textarea></div>
              </div>
            </div>
          </div>
      );
      // updateSectionPoints(card); TODO
  },
});

var CardColumn = React.createClass({
  render: function() {
    var section = this.props.column;
    var columnName = this.props.column.name.replace(':', '');
    var cards = this.props.column.tasks.map(function(task) {
      return (<Card task={task} key={task.id} />);
    });
    return (
      <td className="column" id="{section.id}">
        <div className="columnTitle">
          <span className="sectionTitle">{columnName}</span>
          <span className="sectionValue">0</span>
        </div>
        <div className="addCard">
          Add a card
        </div>
        <div className="load hidden">
          <svg className="icon" viewBox="0 0 2 2" xlmns="http://www.w3.org/2000/svg">
          <circle cx="1" cy="1" r="1" /></svg>
        </div>
        {cards}
      </td>
      );
  },
});

var CardBoard = React.createClass({
  render: function() {
    var cardColumns = this.props.data.reverse().map(function(column) {
      return (<CardColumn column={column} key={column.id} />);
    });
    return (
      <table>
        <tbody>
        <tr id="board">
        {cardColumns}
        </tr>
        </tbody>
      </table>
    );
  },
});

var data = getDemoBoard();
React.render(
  <CardBoard data={data} />,
  document.getElementById('project')
);
