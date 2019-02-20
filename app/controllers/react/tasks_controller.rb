class React::TasksController < ApplicationController
  # before_action :authenticate_user!

  def index
    @user = current_user

    if user_signed_in?
      @boards = @user.boards.all

      @board = @boards.find_by(general: true)
      @columns = @board.columns

      @cards = Card.all
      @card_in_columns = CardInColumn.all

      @columns.each do |column|
        @tasks = @cards.where("type = 'Task'")
        @projects = @cards.where("type = 'Project'")
      end
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
