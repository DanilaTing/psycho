class AddLinkToAttachments < ActiveRecord::Migration[5.1]
  def change
    add_column :attachments, :link, :string
  end
end
