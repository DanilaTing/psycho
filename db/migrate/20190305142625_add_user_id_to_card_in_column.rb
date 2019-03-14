class AddUserIdToCardInColumn < ActiveRecord::Migration[5.1]
  def change
    add_column :card_in_columns, :user_id, :integer
  end
end
