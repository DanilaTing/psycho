require 'test_helper'

class ChecklistitemsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @checklistitem = checklistitems(:one)
  end

  test "should get index" do
    get checklistitems_url
    assert_response :success
  end

  test "should get new" do
    get new_checklistitem_url
    assert_response :success
  end

  test "should create checklistitem" do
    assert_difference('Checklistitem.count') do
      post checklistitems_url, params: { checklistitem: { checklist_id: @checklistitem.checklist_id, name: @checklistitem.name } }
    end

    assert_redirected_to checklistitem_url(Checklistitem.last)
  end

  test "should show checklistitem" do
    get checklistitem_url(@checklistitem)
    assert_response :success
  end

  test "should get edit" do
    get edit_checklistitem_url(@checklistitem)
    assert_response :success
  end

  test "should update checklistitem" do
    patch checklistitem_url(@checklistitem), params: { checklistitem: { checklist_id: @checklistitem.checklist_id, name: @checklistitem.name } }
    assert_redirected_to checklistitem_url(@checklistitem)
  end

  test "should destroy checklistitem" do
    assert_difference('Checklistitem.count', -1) do
      delete checklistitem_url(@checklistitem)
    end

    assert_redirected_to checklistitems_url
  end
end
