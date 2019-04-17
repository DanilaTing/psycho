class CreateTrelloImports < ActiveRecord::Migration[5.1]
  def change
    create_table :trello_imports do |t|
      t.integer :user_id
      t.string :trello_board_name
      t.string :trello_board_id
      t.boolean :imported, default: false

      t.timestamps
    end
  end
end
