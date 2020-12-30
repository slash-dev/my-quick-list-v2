import 'firebase/firestore';
import {
  isLoaded, useFirebase
} from 'react-redux-firebase'
import { CircularProgress } from '@material-ui/core';
import 'firebase/firestore'
import { PopulateProfile, PopulateProfileProps } from '../../Utils/PopulateProfile';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Group } from '../../Model/reducer';
import { useHistory } from "react-router-dom";

function GroupSelectorBase({ profile }: PopulateProfileProps) {
  const firebase = useFirebase()
  const history = useHistory()
  if (!isLoaded(profile)) {
    return <CircularProgress />
  }
  if (!profile || !profile.groups || profile.groups.length === 0) {
    history.push('/groups')
    return <p>Create new group</p>
  }
  const onChange = (event: any) => {
    if (!event.target.value) {
      history.push('/groups')
      return false;
    }
    firebase.updateProfile({ currentGroupId: event.target.value })
  }
  return <div>
    <FormControl style={{ width: '100%' }}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={profile.currentGroupId}
        onChange={onChange}
      >
        {profile.groups.map((g: Group) => <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>)}
        <MenuItem >+ Add</MenuItem>
      </Select>
    </FormControl>
  </div >
}

const GroupSelector = PopulateProfile(GroupSelectorBase) as React.ComponentType

export default GroupSelector
