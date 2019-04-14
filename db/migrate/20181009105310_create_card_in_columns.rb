class CreateCardInColumns < ActiveRecord::Migration[5.1]
  def change
    create_table :card_in_columns do |t|
      t.string  :columnable_type
      t.integer :columnable_id
      t.integer :column_id
      t.integer :position

      t.timestamps
    end
  end
end
