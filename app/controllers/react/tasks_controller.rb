class React::TasksController < ApplicationController

  def index
    @board = Board.find_by(general: true)
    @columns = @board.columns

    @cards = Card.all
    @card_in_columns = CardInColumn.all

    @columns.each do |column|
      @tasks = @cards.where("type = 'Task'")
      @projects = @cards.where("type = 'Project'")
    end
  end

  def show
    @board = Board.find_by(general: true)
    @columns = @board.columns

    @columns.each do |column|
      @cards = column.cards
      @tasks = @cards.where("type = 'Task'")
      @projects = @cards.where("type = 'Project'")
      @card_in_columns = column.card_in_columns
    end
  end
end
