import {
  isLoaded, useFirebase
} from 'react-redux-firebase'
import { CircularProgress } from '@material-ui/core';
import { Group } from '../../Model/reducer';
import { Form, Field } from 'react-final-form'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { PopulateProfile, PopulateProfileProps } from "../../Utils/PopulateProfile";
import InputLabel from '@material-ui/core/InputLabel';

function GroupsBase({ auth, profile, firestore }: PopulateProfileProps) {
  const firebase = useFirebase()
  if (!isLoaded(profile) || !isLoaded(auth)) {
    return <CircularProgress />
  }
  const onSubmit = async (values: any, form: any) => {
    const newGroup: Group = {
      name: values.groupName,
      owner: auth.displayName!,
      ownerId: auth.uid,
      members: {}
    }
    newGroup.members[auth.email!] = { name: auth.displayName! }
    const groupRef = await firestore.add('groups', newGroup)
    let currentGroups: any[] = [];
    if (profile && profile.groups) {
      currentGroups = profile.groups.map((g: any) => g.id)
    }
    await firebase.updateProfile({
      name: auth.displayName,
      groups: [...currentGroups, groupRef.id],
      currentGroupId: (profile && profile.currentGroupId) ? profile.currentGroupId : groupRef.id
    })
    setTimeout(form.reset)
  }
  const validate = (values: any) => {
    const errors = {}
    if (!values.groupName || values.groupName.length < 3) {
      // @ts-ignore
      errors['groupName'] = 'Group name is too short'
    }
    return errors;
  }
  return <div>
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, submitting, pristine }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <Field name="groupName">
              {({ input, meta }) => (
                <div>
                  <InputLabel>New group name:</InputLabel>
                  <TextField
                    name={input.name}
                    value={input.value}
                    onChange={input.onChange}
                    style={{ marginRight: '15px' }}
                    placeholder="Group Name"
                    disabled={submitting} />
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    type="submit"
                    disabled={submitting || pristine} >
                    Add
                  </Button>
                  {(meta.error || meta.submitError) && meta.touched && (
                    <span style={{ fontWeight: 'bold', color: '#800' }}>
                      {meta.error || meta.submitError}
                    </span>
                  )}
                </div>)}
            </Field>
          </div>
        </form>)} />
    {!profile || !profile.groups || profile.groups.length === 0 ? <p>You don't have any group, you can create one</p>
      : <div>
        {profile.groups.map((g: Group) => <p key={g.id!}>{g.name}
          {g.ownerId === auth.uid && '(owner)'}
          {g.id === profile.currentGroupId && '(current)'}</p>)}
      </div>}
  </div>
}

const Groups = PopulateProfile(GroupsBase) as React.ComponentType

export default Groups
