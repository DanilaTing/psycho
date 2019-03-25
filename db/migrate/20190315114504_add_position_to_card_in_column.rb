class AddPositionToCardInColumn < ActiveRecord::Migration[5.1]
  def change
    add_column :card_in_columns, :position, :integer
  end
end
