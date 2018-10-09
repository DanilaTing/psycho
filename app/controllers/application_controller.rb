class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  @columns = Column.all
end
