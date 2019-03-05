class CreateCardInColumns < ActiveRecord::Migration[5.1]
  def change
    create_table :card_in_columns do |t|
      t.integer :column_id
      t.integer :card_id

      t.timestamps
    end
  end
end
