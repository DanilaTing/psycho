class ReactController < ApplicationController

  def index
    @board = Board.find_by(general: true)
    @columns = @board.columns

    @columns.each do |column|
      @cards = column.cards
      @card_in_columns = column.card_in_columns
    end

    # @board = Board.find_by(general: true)
    #
    # @board = @boardG.as_json(
    #   only: [:id, :name, :created_at],
    #   include: {
    #     columns:
    #       { only: [:id, :name],
    #       include: { cards: { only: [:id, :name]} }
    #     }
    #   }
    # )
  end
end
