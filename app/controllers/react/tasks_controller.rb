class React::TasksController < ApplicationController

  def index
    @board = Board.find_by(general: true).as_json(include: :columns)
    @card_in_columns = CardInColumn.all
    @card_in_columns = CardInColumn.all
    @tasks = Card.where("type = 'Task'").as_json(only: [:id, :name, :description, :project_id, :type], include: :card_in_columns)
  end

  def show
    @board = Board.find_by(general: true)
    @columns = @board.columns
    @cards = Card.order('id ASC')
    @card_in_columns = CardInColumn.all

    @columns.each do |column|
      @tasks = @cards.where("type = 'Task'")
      @projects = @cards.where("type = 'Project'")
    end
  end
end
