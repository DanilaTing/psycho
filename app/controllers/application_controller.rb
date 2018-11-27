class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def show
    @columns = Column.all
    @boards = Board.all
    @cards = Card.all
  end
end
