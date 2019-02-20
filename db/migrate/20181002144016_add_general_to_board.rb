class AddGeneralToBoard < ActiveRecord::Migration[5.1]
  def change
    add_column :boards, :general, :boolean
  end
end
