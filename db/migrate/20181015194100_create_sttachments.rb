class CreateSttachments < ActiveRecord::Migration[5.1]
  def change
    create_table :sttachments do |t|
      t.string :type

      t.timestamps
    end
  end
end
