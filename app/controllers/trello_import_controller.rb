class TrelloImportController < ApplicationController
  before_action :authenticate_user!
  before_action :set_general_board, only: [:new_board_import]

  def new_board_import
    user = Trello::Member.find("zakharday")
    trello_boards = user.boards
    trello_import_ids = current_user.trello_imports.collect { |i| i.trello_board_id }

    trello_boards.each do |trello_board|
      unless trello_import_ids.include?(trello_board.id)
        current_user.trello_imports.create!(
          trello_board_name: trello_board.name,
          trello_board_id: trello_board.id
        )
      end
    end

    @trello_imports = current_user.trello_imports
  end

  def create_board_import
    TrelloImport.new
  end
end
