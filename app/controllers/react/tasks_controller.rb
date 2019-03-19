class React::TasksController < ApplicationController
  # before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def index
    @user = current_user

    if user_signed_in?
      @boards = @user.boards.as_json(include: { columns: {
                                                include: { cards: {
                                                           only: [:id, :name, :description, :project_id, :type],
                                                           include: { card_in_columns: {
                                                                      include: { card: {
                                                                                 only: [:id, :name, :description, :project_id, :type],
                                                                      } }
                                                           }}
                                                         }}
      } })
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
