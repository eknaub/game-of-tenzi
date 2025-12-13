import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import {
  GameModifier,
  GameModifierCategories,
  GameModifierInfo,
} from "../utils/gameModifierEnums";
import { useGameStore } from "../stores/useGameStore";

function GameModifierBox() {
  const { toggleModifier } = useGameStore();
  const selectedModifiers = useGameStore(
    (state) => state.selectedModifiers ?? []
  );
  const isCompModeActivated = selectedModifiers.includes(
    GameModifier.COMPETITIVE_MODE
  );

  return (
    <div>
      <Typography
        variant="h5"
        gutterBottom
        color="textPrimary"
        style={{
          textAlign: "center",
        }}
      >
        Game Modifiers
      </Typography>
      <Typography
        variant="body1"
        color="textPrimary"
        style={{
          fontWeight: "bold",
        }}
      >
        {GameModifierCategories.competitive}
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              value={GameModifier.COMPETITIVE_MODE}
              checked={selectedModifiers.includes(
                GameModifier.COMPETITIVE_MODE
              )}
              onChange={() => toggleModifier(GameModifier.COMPETITIVE_MODE)}
              aria-label="Competitive Mode Checkbox"
            />
          }
          label={GameModifierInfo.COMPETITIVE_MODE.name}
        />
      </FormGroup>
      {isCompModeActivated && (
        <>
          <Typography
            variant="body1"
            color="textPrimary"
            style={{
              fontWeight: "bold",
            }}
          >
            {GameModifierCategories.rollLimits}
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  value={GameModifier.ECONOMY}
                  checked={selectedModifiers.includes(GameModifier.ECONOMY)}
                  onChange={() => toggleModifier(GameModifier.ECONOMY)}
                  aria-label="Economy Mode Checkbox"
                />
              }
              label={GameModifierInfo.ECONOMY.name}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={GameModifier.GIGA_ECONOMY}
                  checked={selectedModifiers.includes(
                    GameModifier.GIGA_ECONOMY
                  )}
                  onChange={() => toggleModifier(GameModifier.GIGA_ECONOMY)}
                  aria-label="Giga Economy Mode Checkbox"
                />
              }
              label={GameModifierInfo.GIGA_ECONOMY.name}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={GameModifier.NO_REROLLS}
                  checked={selectedModifiers.includes(GameModifier.NO_REROLLS)}
                  onChange={() => toggleModifier(GameModifier.NO_REROLLS)}
                  aria-label="No Rerolls Checkbox"
                />
              }
              label={GameModifierInfo.NO_REROLLS.name}
            />
          </FormGroup>
        </>
      )}
    </div>
  );
}

export default GameModifierBox;
