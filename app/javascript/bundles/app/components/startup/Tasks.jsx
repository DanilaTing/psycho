import PropTypes from 'prop-types';
import React from 'react';
import $ from 'jquery';

import O_Menubar from '../03_organisms/O_Menubar';
import O_SubMenubar from '../03_organisms/O_SubMenubar';
import O_Board from '../03_organisms/O_Board';
import O_Column from '../03_organisms/O_Column';
import O_NewTask from '../03_organisms/O_NewTask';

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.renderNewTask = this.renderNewTask.bind(this)
    this.closeNewTask = this.closeNewTask.bind(this)
    this.pushNewTaskToTasks = this.pushNewTaskToTasks.bind(this)
    this.pushNewCardInColumn = this.pushNewCardInColumn.bind(this)
    this.updateCardInColumns = this.updateCardInColumns.bind(this)
    this.onBoardClick = this.onBoardClick.bind(this)

    const priorityBoard = props.boards.find(item => item.name === 'Priorities');
    console.log(priorityBoard)

    this.state = {
      cards: [],
      cardInColumns: [],
      inboxId: '',
      newTaskVisible: false,
      currentBoard: 'General',
      columnFromWhereCreated: '',
      activeMenuTab: this.props.activeMenuTab,
      project: this.props.project,
      lowPriorityCards: priorityBoard.columns.find(item => item.name === 'Low'),
      middlePriorityCards: priorityBoard.columns.find(item => item.name === 'Middle'),
      highPriorityCards: priorityBoard.columns.find(item => item.name === 'High')
    }
  }

  setPriorities = () => {
    const priorityBoard = this.props.boards.find(item => item.name === 'Priorities')
    this.setState({
      lowPriorityCards: priorityBoard.columns.find(item => item.name === 'Low'),
      middlePriorityCards: priorityBoard.columns.find(item => item.name === 'Middle'),
      highPriorityCards: priorityBoard.columns.find(item => item.name === 'High')
    })
  }

  addPriorityCard = (data) => {
    const priorityBoard = this.props.boards.find(item => item.name === 'Priorities')
    const priorityColumnsIds = {}
    priorityBoard.columns
      .filter(item => item.name === 'Low' || item.name === 'Middle' || item.name === 'High')
      .forEach(item => priorityColumnsIds[item.id] = item.name)
    switch(priorityColumnsIds[data.column_id]) {
      case 'Low': {
        const lowPriorityCards = priorityBoard.columns.find(item => item.name === 'Low');
        lowPriorityCards.cards.push(data.card)
        this.setState({ lowPriorityCards });
        break;
      }
      case 'Middle': {
        const middlePriorityCards = priorityBoard.columns.find(item => item.name === 'Middle');
        middlePriorityCards.cards.push(data.card)
        this.setState({ middlePriorityCards });
        break;
      }
      case 'High': {
        const highPriorityCards = priorityBoard.columns.find(item => item.name === 'High');
        highPriorityCards.cards.push(data.card)
        this.setState({ highPriorityCards });
        break;
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.currentBoard !== this.state.currentBoard) {
      if (this.state.currentBoard === 'General') {
        this.setPriorities()
      } else {
        this.setState({
          lowPriorityCards: null,
          middlePriorityCards: null,
          highPriorityCards: null
        })
      }
    }
  }

  componentWillMount() {
    const { boards, are_tasks, are_projects } = this.props
    console.log(boards)
    let cards = []
    let cardInColumns = []
    var inboxId

    // Находим Tasks из всех Cards и колонку Inbox
    boards.map(board => {
      if (board.name == this.state.currentBoard) {
        board.columns.map(column => {
          column.cards.map(card => {
            if (are_tasks == true) {
              if (card.type == 'Task') {
                cards.push(card)
              }
            }
            if (are_projects == true) {
              if (card.type == 'Project') {
                cards.push(card)
              }
            }
          })

          if (column.name == 'Inbox') {
            inboxId = column.id
          }
        })
      }
    })

    cards.map(card => {
      card.card_in_columns.map(c => {
        cardInColumns.push(c)
      })
    })

    this.setState({
      cards: cards,
      cardInColumns: cardInColumns,
      columnFromWhereCreated: inboxId,
      inboxId: inboxId,
    })
  }

  onBoardClick(currentBoard) {
    this.setState({
      currentBoard
    })
  }

  changeCurrentBoard = (boardName) => {
    this.setState({
      currentBoard: boardName
    })
  }

  pushNewTaskToTasks(task) {
    const cards = this.state.cards
    cards.push(task)
    this.setState({
      cards: cards
    })

    task.card_in_columns.map(c => { this.pushNewCardInColumn(c) })
  }

  pushNewCardInColumn(cardInColumn) {
    const cardInColumns = this.state.cardInColumns
    cardInColumns.push(cardInColumn)
    this.setState({
      cardInColumns: cardInColumns
    })
  }

  updateCardInColumns(cardInColumn) {
    const cardInColumns = this.state.cardInColumns
    cardInColumns.map((c, i) => {
      if (c.id == cardInColumn.id) {
        cardInColumns.splice(i, 1, cardInColumn)
      }
    })
    this.setState({
      cardInColumns: cardInColumns
    })
  }

  renderNewTask(id) {
    this.setState({
      columnFromWhereCreated: id,
      newTaskVisible: true
    })
  }

  closeNewTask() {
    this.setState({
      newTaskVisible: false,
      columnFromWhereCreated: this.state.inboxId
    })
  }

  renderCurrentBoard() {
    const { project } = this.props
    const { currentBoard, cards, cardInColumns, lowPriorityCards, middlePriorityCards, highPriorityCards } = this.state
    const { boards } = this.props

    console.log(lowPriorityCards, middlePriorityCards, highPriorityCards)

    let boardToRender

    boards.map(board => {
      if (board.name == currentBoard) {
        boardToRender = board
      }
    })

    return(
      <O_Board
        boards              = { boards }
        board               = { boardToRender }
        columns             = { boardToRender.columns }
        project             = { project }
        cards               = { cards }
        cardInColumns       = { cardInColumns }
        renderNewTask       = { this.renderNewTask }
        updateCardInColumns = { this.updateCardInColumns }
        lowPriorityCards = {lowPriorityCards}
        middlePriorityCards = {middlePriorityCards}
        highPriorityCards = {highPriorityCards}
        onSave = { () => {}}
      />
    )
  }

  render() {
    const { boards, user } = this.props
    const { columnFromWhereCreated, inboxId, activeMenuTab, project, cards, cardInColumns } = this.state

    return (
      <section>
        { this.state.newTaskVisible ? (
          <O_NewTask
            closeNewTask       = { this.closeNewTask }
            project            = { project }
            boards             = { boards }
            user               = { user }
            columnId           = { columnFromWhereCreated }
            pushNewTaskToTasks = { this.pushNewTaskToTasks }
            onSave             = { this.addPriorityCard }
          />
        ) : '' }
        <O_Menubar
          activeTab     = { activeMenuTab }
          renderNewTask = { this.renderNewTask }
          inboxId       = { inboxId }
          project       = { project }
        />
        <O_SubMenubar
          boards       = { boards }
          currentBoard = { this.state.currentBoard }
          onBoardClick = { this.onBoardClick }
        />
        { this.renderCurrentBoard() }
      </section>
    );
  }
}
