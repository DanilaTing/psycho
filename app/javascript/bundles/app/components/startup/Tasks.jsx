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
      activeMenuTab: '',
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

    var activeMenuTab
    if (are_tasks == true) {
      activeMenuTab = 'Tasks'
    }
    if (are_projects == true) {
      activeMenuTab = 'Projects'
    }

    this.setState({
      cards: cards,
      cardInColumns: cardInColumns,
      columnFromWhereCreated: inboxId,
      inboxId: inboxId,
      activeMenuTab: activeMenuTab
    })
  }

  onBoardClick(currentBoard) {
    this.setState({
      currentBoard
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
        project             = { project }
        cards               = { cards }
        cardInColumns       = { cardInColumns }
        renderNewTask       = { this.renderNewTask }
        updateCardInColumns = { this.updateCardInColumns }
        lowPriorityCards = {lowPriorityCards}
        middlePriorityCards = {middlePriorityCards}
        highPriorityCards = {highPriorityCards}
        onSave = { () => {
          this.setPriorities()
          this.forceUpdate()
        }}
      />
    )
  }

  render() {
    const { boards, user } = this.props
    const { columnFromWhereCreated, inboxId, activeMenuTab } = this.state

    return (
      <section>
        { this.state.newTaskVisible ? (
          <O_NewTask
            closeNewTask       = { this.closeNewTask }
            boards             = { boards }
            user               = { user }
            columnId           = { columnFromWhereCreated }
            pushNewTaskToTasks = { this.pushNewTaskToTasks }
          />
        ) : '' }
        <O_Menubar
          activeTab     = { activeMenuTab }
          renderNewTask = { this.renderNewTask }
          inboxId       = { inboxId }
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
