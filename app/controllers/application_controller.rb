class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  # before_action :set_current_user

  rescue_from CanCan::AccessDenied do |exception|
    respond_to do |format|
      format.json { head :forbidden, content_type: 'text/html' }
      format.html { redirect_to root_url, notice: exception.message }
      format.js   { head :forbidden, content_type: 'text/html' }
    end
  end

  def set_current_user
    User.current = current_user
  end

  def show
    @columns = Column.all
    @boards = Board.all
    @cards = Card.all
  end
end
