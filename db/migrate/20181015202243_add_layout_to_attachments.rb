class AddLayoutToAttachments < ActiveRecord::Migration[5.1]
  def change
    add_column :attachments, :layout, :boolean
  end
end
